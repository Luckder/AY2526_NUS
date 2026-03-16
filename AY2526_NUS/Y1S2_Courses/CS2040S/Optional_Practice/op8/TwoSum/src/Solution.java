import java.util.HashMap;
import java.util.Map;

public class Solution {
    public static int solve(int[] arr, int target) {
        // TODO: Implement your solution here

        Map<Integer, Integer> table = new HashMap<>();

        int pairCount = 0;

        for (int num : arr) {

            int findMe = target - num;

            if (table.getOrDefault(findMe, 0) > 0) {
                pairCount += 1;
                table.put(findMe, table.get(findMe) - 1);
            } else {
                table.put(num, table.getOrDefault(num, 0) + 1);
            }

        }

        return pairCount;
    }
}
