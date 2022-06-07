import java.util.*;

public class 전력망을_둘로_나누기 {

	public static void main(String[] args) {
		int wires[][] = { { 1, 3 }, { 2, 3 }, { 3, 4 }, { 4, 5 }, { 4, 6 }, { 4, 7 }, { 7, 8 }, { 7, 9 } };
		int result = solution(9, wires);
		System.out.println("result : " + result);
	}

	private static void groupping(HashMap<Integer, List<Integer>> group, int wire[], int target, int value) {
		List<Integer> set;
		if (group.get(wire[target]) == null) {
			set = new ArrayList<>();
			set.add(wire[value]);
			group.put(wire[target], set);
		} else {
			set = group.get(wire[target]);
			boolean isAdd = true;
			for (int num : set) {
				if (num == wire[value]) {
					isAdd = false;
					break;
				}
			}
			if (isAdd) {
				set.add(wire[value]);
			}
		}
	}

	private static void makeLine(int noMember[], HashMap<Integer, List<Integer>> group, int me,
			HashMap<Integer, Boolean> newGroup) {
		List<Integer> list = group.get(me);
		for (int target : list) {
			if (me == noMember[0] || me == noMember[1]) {
				if (target == noMember[0] || target == noMember[1]) {
					newGroup.put(me, true);
					continue;
				}
			}
			if (newGroup.get(target) == null) {
				newGroup.put(target, true);
				makeLine(noMember, group, target, newGroup);
			}
		}
	}

	public static int solution(int n, int[][] wires) {

		int answer = n;

		HashMap<Integer, List<Integer>> group = new HashMap<>();
		for (int wire[] : wires) {
			groupping(group, wire, 0, 1);
			groupping(group, wire, 1, 0);
		}

		System.out.println(group);

		int cursor = 0;
		while (cursor < wires.length) {
			int noMember[] = wires[cursor];
			for (Integer me : group.keySet()) {
				HashMap<Integer, Boolean> newGroup = new HashMap<>();
				if (me != noMember[0] && me != noMember[1]) {
					makeLine(noMember, group, me, newGroup);
					int sum = Math.abs(newGroup.size() - Math.abs(newGroup.size() - n));
					if (sum < answer)
						answer = sum;
					break;
				}
			}
			cursor++;
		}
		return answer;
	}
}
