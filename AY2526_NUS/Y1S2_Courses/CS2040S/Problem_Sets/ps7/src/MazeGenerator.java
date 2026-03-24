import java.util.Random;

public class MazeGenerator {

	private MazeGenerator() { /* Blank Constructor */ }

	// TODO: Feel free to modify the method parameters.
	public static Maze generateMaze(int rows, int columns, double probability, long seed) {
		// Sidewinder Algorithm

		Room[][] rooms = new Room[rows][columns];
		int prev = 0;
		int carveMe = 0;
		Random rng = new Random();
		rng.setSeed(seed);

		// Do the top row first
		for (int j = 0; j < columns; j++) {
			if (j == 0) {
				rooms[0][j] = new Room(true, true, false, true);
			} else if (j == columns - 1) {
				rooms[0][j] = new Room(true, true, true, false);
			} else {
				rooms[0][j] = new Room(true, true, false, false);
			}
		}

		for (int i = 1; i < rows; i++) {
			prev = 0;
			for (int j = 0; j < columns; j++) {

				// nextBoolean() means 50% means less walls
				// nextDouble() allows changing of probability
				if (rng.nextDouble() < probability && j < columns - 1) { // Yes to carve east
					if (j == 0) {
						rooms[i][j] = new Room(true, true, false, true);
					} else {
						boolean tempWest = rooms[i][j - 1].hasEastWall();
						rooms[i][j] = new Room(true, true, false, tempWest);
					}
				} else { // No to carve east, carve north instead

					if (j == 0) { carveMe = 0; }
					else if (prev == 0) { carveMe = rng.nextInt(j + 1); }
					else { carveMe = rng.nextInt(prev + 1, j + 1); }

					if (j == 0) {
						rooms[i][j] = new Room(true, true, false, true);
					} else if (j == columns - 1) {
						boolean tempWest = rooms[i][j - 1].hasEastWall();
						rooms[i][j] = new Room(true, true, true, tempWest);
					} else {
						boolean tempWest = rooms[i][j - 1].hasEastWall();
						rooms[i][j] = new Room(true, true, true, tempWest);
					}

					// Change the carved room
					if (carveMe == 0) {
						rooms[i][carveMe] = new Room(false, true, false, true);
					} else if (carveMe == columns - 1) {
						boolean tempWest = rooms[i][carveMe - 1].hasEastWall();
						rooms[i][carveMe] = new Room(false, true, true, tempWest);
					} else {
						boolean tempWest = rooms[i][carveMe - 1].hasEastWall();
						rooms[i][carveMe] = new Room(false, true, false, tempWest);
					}

					// Change the above room
					boolean tempNorth = rooms[i - 1][carveMe].hasNorthWall();
					boolean tempEast = rooms[i - 1][carveMe].hasEastWall();
					boolean tempWest = rooms[i - 1][carveMe].hasWestWall();
					rooms[i - 1][carveMe] = new Room(tempNorth,false, tempEast, tempWest);

					prev = j;
				}

			}
		}

		return new Maze(rooms);
	}
}