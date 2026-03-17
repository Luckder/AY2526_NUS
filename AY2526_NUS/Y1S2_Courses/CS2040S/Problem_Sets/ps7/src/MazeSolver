import java.util.*;

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
		private List<Room> path;
		private int steps;

		private LabelledRoom(Room room, int roomRow, int roomCol) {
			this.room = room;
			this.roomRow = roomRow;
			this.roomCol = roomCol;
			this.path = new ArrayList<>();
			this.path.add(this.room);
		}

		private LabelledRoom(Room room, int roomRow, int roomCol, int steps) {
			this.room = room;
			this.roomRow = roomRow;
			this.roomCol = roomCol;
			this.steps = steps;
		}

		private Room getRoom() {
			return this.room;
		}

		private int[] getCoords() {
			return new int[] { roomRow, roomCol };
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

		private int getLength() {
			return this.queue.size();
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
	}

	@Override
	public Integer pathSearch(int startRow, int startCol, int endRow, int endCol) throws Exception {
		// TODO: Find shortest path.

		if (this.maze == null) {
			throw new Exception("No maze initialized!");
		}

		if (startRow < 0 || startRow > this.maze.getRows() || startCol < 0 || startCol > this.maze.getColumns()) {
			throw new Exception("Invalid parameter(s)!");
		} else if (endRow < 0 || endRow > this.maze.getRows() || endCol < 0 || endCol > this.maze.getColumns()) {
			throw new Exception("Invalid parameter(s)!");
		}

		this.startRow = startRow;
		this.startCol = startCol;
		this.endRow = endRow;
		this.endCol = endCol;

		this.currRoom = this.maze.getRoom(this.startRow, this.startCol);
		this.currRoom.onPath = true;

		this.currLRoom = new LabelledRoom(this.currRoom, this.startRow, this.startCol);

		if (this.queue == null) { this.queue = new Queue(); }
		else { this.queue.flush(); }

		this.visited[this.startRow][this.startCol] = true;
		this.queue.enqueue(this.currLRoom);

		while(!this.queue.isEmpty()) {

			this.currLRoom = this.queue.getFirst();
			this.currRoom = this.currLRoom.getRoom(); // Traverse to the next Room
			this.currRow =  this.currLRoom.getCoords()[0];
			this.currCol =  this.currLRoom.getCoords()[1];


			if (this.currLRoom.getCoords()[0] == this.endRow && this.currLRoom.getCoords()[1] == this.endCol) {
				// Solved!

				for (Room r : this.currLRoom.path) {
					r.onPath = true;
				}

				// Clears visited array
				this.visited = new boolean[this.visited.length][this.visited[0].length];

				return this.currLRoom.path.size();
			}

			// Naughty Elephant Squirt Water (NESW order)
			// BFS to find the shortest route compared to DFS in Naive version
			if (!this.currRoom.hasNorthWall()) {
				int newRow = this.currRow + DELTAS[NORTH][0];
				int newCol = this.currCol + DELTAS[NORTH][1];

				if (!this.visited[newRow][newCol]) {
					Room newRoom = this.maze.getRoom(newRow, newCol); // Next Room
					LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol);
					this.visited[newRow][newCol] = true;
					this.queue.enqueue(qMe); // Queues neighbouring room
					List<Room> copied = new ArrayList<>(this.currLRoom.path); // Defensive copy
					qMe.path.addAll(0, copied); // Prepends
				}
			}

			if (!this.currRoom.hasEastWall()) {
				int newRow = this.currRow + DELTAS[EAST][0];
				int newCol = this.currCol + DELTAS[EAST][1];

				if (!this.visited[newRow][newCol]) {
					Room newRoom = this.maze.getRoom(newRow, newCol); // Next Room
					LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol);
					this.visited[newRow][newCol] = true;
					this.queue.enqueue(qMe); // Queues neighbouring room
					List<Room> copied = new ArrayList<>(this.currLRoom.path); // Defensive copy
					qMe.path.addAll(0, copied); // Prepends
				}
			}

			if (!this.currRoom.hasSouthWall()) {
				int newRow = this.currRow + DELTAS[SOUTH][0];
				int newCol = this.currCol + DELTAS[SOUTH][1];

				if (!this.visited[newRow][newCol]) {
					Room newRoom = this.maze.getRoom(newRow, newCol); // Next Room
					LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol);
					this.visited[newRow][newCol] = true;
					this.queue.enqueue(qMe); // Queues neighbouring room
					List<Room> copied = new ArrayList<>(this.currLRoom.path); // Defensive copy
					qMe.path.addAll(0, copied); // Prepends
				}
			}

			if (!this.currRoom.hasWestWall()) {
				int newRow = this.currRow + DELTAS[WEST][0];
				int newCol = this.currCol + DELTAS[WEST][1];

				if (!this.visited[newRow][newCol]) {
					Room newRoom = this.maze.getRoom(newRow, newCol); // Next Room
					LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol);
					this.visited[newRow][newCol] = true;
					this.queue.enqueue(qMe); // Queues neighbouring room
					List<Room> copied = new ArrayList<>(this.currLRoom.path); // Defensive copy
					qMe.path.addAll(0, copied); // Prepends
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

		if (k == 0) { return 1; } // Edge case
		if (k >= (this.maze.getRows() * this.maze.getColumns())) { // Edge case
			// Worst case is the maze is a one path only maze, meaning nth steps is needed,
			// where n is number of Rooms, past this k value, all Rooms can be assuredly traversed
			return this.maze.getRows() * this.maze.getColumns();
		}

		// Clear the memory for a new cycle of numReachable methods to be called
		// Yup, I used MEMOISATION from CS1101S here, I thought it was a neat optimisation;
		// A full BFS is needed only once instead of multiple partial BFSs of increasing depth
		if (this.memoisedStart == null
				|| !(this.memoisedStart[0] == this.startRow &&  this.memoisedStart[1] == this.startCol)) {
			isMemoised = false;
		}

		if (isMemoised) { return this.memory[k]; }

		if (this.queue == null) { this.queue = new Queue(); }
		else { this.queue.flush(); }

		this.currRoom = this.maze.getRoom(this.startRow, this.startCol);
		this.currLRoom = new LabelledRoom(this.currRoom, this.startRow, this.startCol, 0);
		this.currLRoom.steps = 0;

		this.visited = new boolean[this.maze.getRows()][this.maze.getColumns()];
		this.visited[this.startRow][this.startCol] = true;
		this.queue.enqueue(this.currLRoom);

		this.memory = new int[this.maze.getRows() * this.maze.getColumns()];
		this.memory[0] += 1;
		this.memoisedStart = new int[] {this.startRow, this.startCol};

		while (!this.queue.isEmpty()) {

			this.currLRoom = this.queue.getFirst();
			this.currRoom = this.currLRoom.getRoom(); // Traverse to the next Room
			this.currRow =  this.currLRoom.getCoords()[0];
			this.currCol =  this.currLRoom.getCoords()[1];

			// Naughty Elephant Squirt Water (NESW order)
			// BFS to find the shortest route compared to DFS in Naive version
			if (!this.currRoom.hasNorthWall()) {
				int newRow = this.currRow + DELTAS[NORTH][0];
				int newCol = this.currCol + DELTAS[NORTH][1];

				if (!this.visited[newRow][newCol]) {
					Room newRoom = this.maze.getRoom(newRow, newCol); // Next Room
					LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol, 0);
					this.visited[newRow][newCol] = true;
					this.queue.enqueue(qMe); // Queues neighbouring room
					qMe.steps = this.currLRoom.steps + 1; // Counts for k
					this.memory[qMe.steps] += 1; // Increment the count for k steps
				}
			}

			if (!this.currRoom.hasEastWall()) {
				int newRow = this.currRow + DELTAS[EAST][0];
				int newCol = this.currCol + DELTAS[EAST][1];

				if (!this.visited[newRow][newCol]) {
					Room newRoom = this.maze.getRoom(newRow, newCol); // Next Room
					LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol, 0);
					this.visited[newRow][newCol] = true;
					this.queue.enqueue(qMe); // Queues neighbouring room
					qMe.steps = this.currLRoom.steps + 1; // Counts for k
					this.memory[qMe.steps] += 1; // Increment the count for k steps
				}
			}

			if (!this.currRoom.hasSouthWall()) {
				int newRow = this.currRow + DELTAS[SOUTH][0];
				int newCol = this.currCol + DELTAS[SOUTH][1];

				if (!this.visited[newRow][newCol]) {
					Room newRoom = this.maze.getRoom(newRow, newCol); // Next Room
					LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol, 0);
					this.visited[newRow][newCol] = true;
					this.queue.enqueue(qMe); // Queues neighbouring room
					qMe.steps = this.currLRoom.steps + 1; // Counts for k
					this.memory[qMe.steps] += 1; // Increment the count for k steps
				}
			}

			if (!this.currRoom.hasWestWall()) {
				int newRow = this.currRow + DELTAS[WEST][0];
				int newCol = this.currCol + DELTAS[WEST][1];

				if (!this.visited[newRow][newCol]) {
					Room newRoom = this.maze.getRoom(newRow, newCol); // Next Room
					LabelledRoom qMe = new LabelledRoom(newRoom, newRow, newCol, 0);
					this.visited[newRow][newCol] = true;
					this.queue.enqueue(qMe); // Queues neighbouring room
					qMe.steps = this.currLRoom.steps + 1; // Counts for k
					this.memory[qMe.steps] += 1; // Increment the count for k steps
				}
			}

			this.queue.dequeue();
		}

		this.isMemoised = true;

		return this.memory[k];
	}

	public static void main(String[] args) {
		// Do remember to remove any references to ImprovedMazePrinter before submitting
		// your code!
		try {
			Maze maze = Maze.readMaze("maze-sample.txt");
			IMazeSolver solver = new MazeSolver();
			solver.initialize(maze);

			System.out.println(solver.pathSearch(0, 0, 2, 3));
			MazePrinter.printMaze(maze);

			for (int i = 0; i <= 9; ++i) {
				System.out.println("Steps " + i + " Rooms: " + solver.numReachable(i));
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
}
