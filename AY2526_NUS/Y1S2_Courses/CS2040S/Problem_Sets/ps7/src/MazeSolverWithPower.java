import java.util.List;
import java.util.LinkedList;

public class MazeSolverWithPower implements IMazeSolverWithPower {
	private static final int NORTH = 0, SOUTH = 1, EAST = 2, WEST = 3;
	private static int[][] DELTAS = new int[][] {
			{ -1, 0 }, // North
			{ 1, 0 }, // South
			{ 0, 1 }, // East
			{ 0, -1 } // West
	};

	private boolean[][][] visited;
	private Maze maze;
	private int currRow, currCol, startRow, startCol, endRow, endCol;
	private Room currRoom;
	private LabelledRoom currLRoom;
	private Queue queue;
	private int[] memory;
	private boolean isMemoised = false;
	private int[] memoisedStart;
	private int power;

	private final class LabelledRoom {
		private Room room;
		private int roomRow;
		private int roomCol;
		private int steps;
		private LabelledRoom parent;
		private int receivedPower;

		// For numReachable method
		private LabelledRoom(Room room, int roomRow, int roomCol, int steps) {
			this.room = room;
			this.roomRow = roomRow;
			this.roomCol = roomCol;
			this.steps = steps;
		}

		// For pathSearch method V2
		private LabelledRoom(Room room, int roomRow, int roomCol, LabelledRoom parent, int receivedPower) {
			this.room = room;
			this.roomRow = roomRow;
			this.roomCol = roomCol;
			this.parent = parent;
			this.receivedPower = receivedPower;
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

	public MazeSolverWithPower() {
		// TODO: Initialize variables.
	}

	@Override
	public void initialize(Maze maze) {
		// TODO: Initialize the solver.

		this.maze = maze;
		this.visited = new boolean[this.maze.getRows()][this.maze.getColumns()][this.power + 1];
		this.isMemoised = false;
		this.memoisedStart = null;
	}

	@Override
	public Integer pathSearch(int startRow, int startCol, int endRow, int endCol) throws Exception {
		// TODO: Find shortest path.

		return pathSearch(startRow, startCol, endRow, endCol, 0);
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
				|| !(this.memoisedStart[0] == this.startRow
				&& this.memoisedStart[1] == this.startCol
				&& this.memoisedStart[2] == this.power)) {
			isMemoised = false;
		}

		if (isMemoised) { return k < this.memory.length ? this.memory[k] : 0;  }

		this.memory = new int[this.maze.getRows() * this.maze.getColumns()];
		this.memory[0] += 1;
		this.memoisedStart = new int[] { this.startRow, this.startCol, this.power };

		if (this.queue == null) { this.queue = new Queue(); }
		else { this.queue.flush(); }

		this.currRoom = this.maze.getRoom(this.startRow, this.startCol);
		this.currLRoom = new LabelledRoom(this.currRoom, this.startRow, this.startCol, 0);
		this.currLRoom.steps = 0;

		this.visited = new boolean[this.maze.getRows()][this.maze.getColumns()][this.power + 1];
		this.visited[this.startRow][this.startCol][0] = true;
		this.queue.enqueue(this.currLRoom);

		boolean[][] visitedSteps = new boolean[this.maze.getRows()][this.maze.getColumns()];
		visitedSteps[this.startRow][this.startCol] = true;

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

				int nextPower = this.currLRoom.receivedPower;
				int nextSteps = this.currLRoom.steps + 1;

				if (hasWall) { nextPower += 1; }

				if (newRow >= 0 && newRow < this.maze.getRows() && newCol >= 0 && newCol < this.maze.getColumns()) {
					if (nextPower <= this.power && !this.visited[newRow][newCol][nextPower]) {
						this.visited[newRow][newCol][nextPower] = true;
						Room newRoom = this.maze.getRoom(newRow, newCol);
						LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol, nextSteps);
						qMe.receivedPower = nextPower;
						this.queue.enqueue(qMe);

						// Change if first time visit
						if (!visitedSteps[newRow][newCol]) {
							visitedSteps[newRow][newCol] = true;
							if (nextSteps < this.memory.length) { this.memory[nextSteps] += 1; }
						}
					}
				}
			}

			this.queue.dequeue();
		}

		this.isMemoised = true;

		return k < this.memory.length ? this.memory[k] : 0;
	}

	@Override
	public Integer pathSearch(int startRow, int startCol, int endRow,
							  int endCol, int startingPower) throws Exception {
		// TODO: Find shortest path with powers allowed.

		if (this.maze == null) {
			throw new Exception("No maze initialized!");
		}

		if (startRow < 0 || startRow >= this.maze.getRows() || startCol < 0 || startCol >= this.maze.getColumns()) {
			throw new Exception("Invalid parameter(s)!");
		} else if (endRow < 0 || endRow >= this.maze.getRows() || endCol < 0 || endCol >= this.maze.getColumns()) {
			throw new Exception("Invalid parameter(s)!");
		} else if (startingPower < 0) {
			throw new Exception("Invalid parameter(s)!");
		}

		this.power = startingPower;

		// Clears visitedPower array
		this.visited = new boolean[this.maze.getRows()][this.maze.getColumns()][this.power + 1];

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

		this.currLRoom = new LabelledRoom(this.currRoom, this.startRow, this.startCol, null, 0);

		if (this.queue == null) { this.queue = new Queue(); }
		else { this.queue.flush(); }

		this.visited[this.startRow][this.startCol][0] = true;
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

				int nextPower = this.currLRoom.receivedPower;

				if (hasWall) { nextPower += 1; }

				if (newRow >= 0 && newRow < this.maze.getRows() && newCol >= 0 && newCol < this.maze.getColumns()) {
					if (nextPower <= this.power && !this.visited[newRow][newCol][nextPower]) {
						this.visited[newRow][newCol][nextPower] = true;
						Room newRoom = this.maze.getRoom(newRow, newCol);
						LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol, this.currLRoom, nextPower);
						this.queue.enqueue(qMe);
					}
				}
			}

			this.queue.dequeue();
		}

		return null;
	}

	public static void main(String[] args) {
		try {
			Maze maze = Maze.readMaze("maze-sample.txt");
			IMazeSolverWithPower solver = new MazeSolverWithPower();
			solver.initialize(maze);

			System.out.println(solver.pathSearch(0, 0,
					maze.getRows() - 1, maze.getColumns() - 1, 1));
			ImprovedMazePrinter.printMaze(maze, 0, 0);
			//MazePrinter.printMaze(maze);

			for (int i = 0; i <= 9; ++i) {
				System.out.println("Steps " + i + " Rooms: " + solver.numReachable(i));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}