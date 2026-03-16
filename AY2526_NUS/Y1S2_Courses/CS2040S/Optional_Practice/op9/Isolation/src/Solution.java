import java.util.HashMap;
import java.util.Map;

public class Solution {
    // TODO: Implement your solution here
    public static int solve(int[] arr) {
        int maxLength = 0;

        int leftPointer = 0;
        int rightPointer = leftPointer;

        Map<Integer, Integer> table = new HashMap<>();

        while (rightPointer < arr.length) {

            int curr = arr[rightPointer];

            if (table.containsKey(curr)) {
                int removeMe = arr[leftPointer];
                table.remove(removeMe);
                leftPointer += 1;
                continue;
            } else {
                maxLength = Math.max(maxLength, rightPointer - leftPointer + 1);
                table.put(curr, 1);
            }

            rightPointer += 1;
        }

        return maxLength;
    }
}