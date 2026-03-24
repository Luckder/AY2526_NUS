import java.util.Arrays;
import java.util.ArrayList;

public class BellmanFord {
    // DO NOT MODIFY THE TWO STATIC VARIABLES BELOW
    public static int INF = 20000000;
    public static int NEGINF = -20000000;
    // TODO: add additional attributes and/or variables needed here, if any

    private ArrayList<ArrayList<IntPair>> graph;
    private int source = -1;
    private int[] distances;
    private int numOfNodes;

    public BellmanFord(ArrayList<ArrayList<IntPair>> adjList) {
        // TODO: initialize your attributes here, if any

        this.graph = adjList;
        this.distances = new int[adjList.size()];
        this.numOfNodes = adjList.size() - 1;

        Arrays.fill(distances, INF);
    }

    // TODO: add additional methods here, if any

    public void computeShortestPaths(int source) {
        this.source = source;
        this.distances[source] = 0;

        for (int i = 0; i < this.numOfNodes; i++) {

            for (int j = 0; j < this.graph.size(); j++) {

                for (IntPair edge : this.graph.get(j)) {

                    int k = edge.first;
                    int l = edge.second;

                    if (distances[j] != INF && distances[j] + l < distances[k]) {
                        distances[k] = distances[j] + l;
                    }
                }

            }

        }

        for (int i = 0; i < this.numOfNodes; i++) {

            for (int j = 0; j < this.graph.size(); j++) {

                for (IntPair edge : this.graph.get(j)) {

                    int k = edge.first;
                    int l = edge.second;

                    if (distances[j] != INF) {
                        if (distances[j] == NEGINF || distances[j] + l < distances[k]) {
                            distances[k] = NEGINF;
                        }
                    }
                }

            }

        }
    }
    public int getDistance(int node) {
        // TODO: implement your getDistance operation here

        if (this.source < 0) { throw new IllegalArgumentException("No source node!"); }

        return this.distances[node];
    }
}