import java.util.List;
import java.util.LinkedList;

public class MazeSolver implements IMazeSolver {
	private static final int NORTH = 0, SOUTH = 1, EAST = 2, WEST = 3;
	private static int[][] DELTAS = new int[][] {
		{ -1, 0 }, // North
		{ 1, 0 }, // South
		{ 0, 1 }, // East
		{ 0, -1 } // West
	};

	private boolean[][] visited;
	private Maze maze;
	private int currRow, currCol, startRow, startCol, endRow, endCol;
	private Room currRoom;
	private LabelledRoom currLRoom;
	private Queue queue;
	private int[] memory;
	private boolean isMemoised = false;
	private int[] memoisedStart;

	// This class could have been avoided had there been methods in Maze or Room classes
	// to get the row and column, at least for my implementation of MazeSolver
	// But then again, this class expanded to be something very useful for this problem set
	private final class LabelledRoom {
		private Room room;
		private int roomRow;
		private int roomCol;
		private int steps;
		private LabelledRoom parent;

		// For pathSearch method
		private LabelledRoom(Room room, int roomRow, int roomCol, LabelledRoom parent) {
			this.room = room;
			this.roomRow = roomRow;
			this.roomCol = roomCol;
			this.parent = parent;
		}

		// For numReachable method
		private LabelledRoom(Room room, int roomRow, int roomCol, int steps) {
			this.room = room;
			this.roomRow = roomRow;
			this.roomCol = roomCol;
			this.steps = steps;
		}
	}

	private final class Queue {
		private final List<LabelledRoom> queue;

		private Queue() {
			this.queue = new LinkedList<LabelledRoom>();
		}

		private void enqueue(LabelledRoom room) {
			this.queue.add(room);
		}

		private void dequeue() throws Exception {
			if (this.queue.isEmpty()) {
				throw new Exception("Queue is empty!");
			} else {
				this.queue.removeFirst();
			}
		}

		private boolean isEmpty() {
			return this.queue.isEmpty();
		}

		private LabelledRoom getFirst() {
			return this.queue.getFirst();
		}

		private void flush() {
			this.queue.clear();
		}
	}

	public MazeSolver() {
		// TODO: Initialize variables.

		// Blank
	}

	@Override
	public void initialize(Maze maze) {
		// TODO: Initialize the solver.
		this.maze = maze;
		this.visited = new boolean[this.maze.getRows()][this.maze.getColumns()];
		this.isMemoised = false;
		this.memoisedStart = null;
	}

	@Override
	public Integer pathSearch(int startRow, int startCol, int endRow, int endCol) throws Exception {
		// TODO: Find shortest path.

		if (this.maze == null) {
			throw new Exception("No maze initialized!");
		}

		if (startRow < 0 || startRow >= this.maze.getRows() || startCol < 0 || startCol >= this.maze.getColumns()) {
			throw new Exception("Invalid parameter(s)!");
		} else if (endRow < 0 || endRow >= this.maze.getRows() || endCol < 0 || endCol >= this.maze.getColumns()) {
			throw new Exception("Invalid parameter(s)!");
		}

		// Clears visited array
		this.visited = new boolean[this.visited.length][this.visited[0].length];

		// Resets the onPath booleans
		for (int i = 0; i < this.maze.getRows(); i++) {
			for (int j = 0; j < this.maze.getColumns(); j++) {
				this.maze.getRoom(i, j).onPath = false;
			}
		}

		this.startRow = startRow;
		this.startCol = startCol;
		this.endRow = endRow;
		this.endCol = endCol;

		this.currRoom = this.maze.getRoom(this.startRow, this.startCol);

		this.currLRoom = new LabelledRoom(this.currRoom, this.startRow, this.startCol, null);

		if (this.queue == null) { this.queue = new Queue(); }
		else { this.queue.flush(); }

		this.visited[this.startRow][this.startCol] = true;
		this.queue.enqueue(this.currLRoom);

		while(!this.queue.isEmpty()) {

			this.currLRoom = this.queue.getFirst();
			this.currRoom = this.currLRoom.room; // Traverse to the next Room
			this.currRow =  this.currLRoom.roomRow;
			this.currCol =  this.currLRoom.roomCol;


			if (this.currLRoom.roomRow == this.endRow && this.currLRoom.roomCol == this.endCol) {
				// Solved!

				int steps = 0;
				LabelledRoom backtrack = this.currLRoom;

				while (backtrack != null) {
					backtrack.room.onPath = true;
					steps++;
					backtrack = backtrack.parent;
				}

				return steps - 1;
			}

			// Naughty Elephant Squirt Water (NESW order)
			// BFS to find the shortest route compared to DFS in Naive version
			for (int i = 0; i < 4; i++) {
				int newRow = this.currRow + DELTAS[i][0];
				int newCol = this.currCol + DELTAS[i][1];

				boolean hasWall = false;
				if (i == NORTH) hasWall = this.currRoom.hasNorthWall();
				else if (i == SOUTH) hasWall = this.currRoom.hasSouthWall();
				else if (i == EAST)  hasWall = this.currRoom.hasEastWall();
				else if (i == WEST)  hasWall = this.currRoom.hasWestWall();

				if (!hasWall && !this.visited[newRow][newCol]) {
					Room newRoom = this.maze.getRoom(newRow, newCol);
					LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol, this.currLRoom);
					this.visited[newRow][newCol] = true;
					this.queue.enqueue(qMe); // Queues neighbouring room
				}
			}

			this.queue.dequeue();
		}

		return null;
	}

	@Override
	public Integer numReachable(int k) throws Exception {
		// TODO: Find number of reachable rooms.

		if (this.maze == null) { throw new Exception("No maze initialized!"); }
		if (k < 0) { throw new Exception("Invalid number of steps!"); }

		// Clear the memory for a new cycle of numReachable methods to be called
		// Yup, I used MEMOISATION from CS1101S here, I thought it was a neat optimisation;
		// A full BFS is needed only once instead of multiple partial BFSs of increasing depth
		if (this.memoisedStart == null
				|| !(this.memoisedStart[0] == this.startRow && this.memoisedStart[1] == this.startCol)) {
			isMemoised = false;
		}

		if (isMemoised) { return k < this.memory.length ? this.memory[k] : 0;  }

		this.memory = new int[this.maze.getRows() * this.maze.getColumns()];
		this.memory[0] += 1;
		this.memoisedStart = new int[] { this.startRow, this.startCol };

		if (this.queue == null) { this.queue = new Queue(); }
		else { this.queue.flush(); }

		this.currRoom = this.maze.getRoom(this.startRow, this.startCol);
		this.currLRoom = new LabelledRoom(this.currRoom, this.startRow, this.startCol, 0);
		this.currLRoom.steps = 0;

		this.visited = new boolean[this.maze.getRows()][this.maze.getColumns()];
		this.visited[this.startRow][this.startCol] = true;
		this.queue.enqueue(this.currLRoom);

		while (!this.queue.isEmpty()) {

			this.currLRoom = this.queue.getFirst();
			this.currRoom = this.currLRoom.room; // Traverse to the next Room
			this.currRow =  this.currLRoom.roomRow;
			this.currCol =  this.currLRoom.roomCol;

			// Naughty Elephant Squirt Water (NESW order)
			// BFS to find the shortest route compared to DFS in Naive version

			for (int i = 0; i < 4; i++) {
				int newRow = this.currRow + DELTAS[i][0];
				int newCol = this.currCol + DELTAS[i][1];

				boolean hasWall = false;
				if (i == NORTH) hasWall = this.currRoom.hasNorthWall();
				else if (i == SOUTH) hasWall = this.currRoom.hasSouthWall();
				else if (i == EAST)  hasWall = this.currRoom.hasEastWall();
				else if (i == WEST)  hasWall = this.currRoom.hasWestWall();

				if (!hasWall && !this.visited[newRow][newCol]) {
					Room newRoom = this.maze.getRoom(newRow, newCol);
					LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol, this.currLRoom);
					this.visited[newRow][newCol] = true;
					this.queue.enqueue(qMe); // Queues neighbouring room
					qMe.steps = this.currLRoom.steps + 1; // Counts for k
					this.memory[qMe.steps] += 1; // Increment the count for k steps
				}
			}

			this.queue.dequeue();
		}

		this.isMemoised = true;

		return k < this.memory.length ? this.memory[k] : 0;
	}

	public static void main(String[] args) {
		// Do remember to remove any references to ImprovedMazePrinter before submitting
		// your code!

		try {
			//Maze maze = Maze.readMaze("maze-sample.txt");
			Maze maze = MazeGenerator.generateMaze(50, 50, 0.9, System.currentTimeMillis());
			IMazeSolver solver = new MazeSolver();
			solver.initialize(maze);

			System.out.println(solver.pathSearch(0, 0, maze.getRows() - 1, maze.getColumns() - 1));
			//MazePrinter.printMaze(maze);
			ImprovedMazePrinter.printMaze(maze, 0, 0);

			for (int i = 0; i <= 9; ++i) {
				System.out.println("Steps " + i + " Rooms: " + solver.numReachable(i));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}