import java.util.Arrays;
import java.util.PriorityQueue;

public class 너비우선탐색_깊이탐색 {

	private static int [][] array;
	

	public static void main(String[] args) {

		int size = 4;
		array = new int[size+1][size+1];
		
		array[1][2] = 1;
		array[2][1] = 1;
		array[2][3] = 1;
		array[3][2] = 1;
		
		array[4][1] = 1;
		array[4][2] = 1;
		array[4][3] = 1;
		
		array[1][4] = 1;
		array[2][4] = 1;
		array[3][4] = 1;		
		
		printArray();
		
		
		boolean history[] = new boolean[size+1];
		System.out.println("-- dfs --");
		dfs(history, 4);
		
		System.out.println("-- bfs --");
		history = new boolean[size+1];
		bfs(history, 1);
	}
	
	//깊이우선탐색
	private static void dfs(boolean history[], int cursor) {
		history[cursor] = true;
		System.out.println(cursor);
		
		for(int j=1;j < history.length; j++) {
			if(array[cursor][j] == 1 && history[j] == false) {
				dfs(history, j);
			}
		}
	}
	
	//넓이 우선 탐색
	private static void bfs(boolean history[], int cursor) {

		PriorityQueue<Integer> que = new PriorityQueue<>();
		
		//첫 시작
		que.offer(cursor);
		history[cursor] = true;		
		
		while(!que.isEmpty()) {
			int index = que.poll();
			for(int i=1;i < array.length; i++) {
				if(array[index][i] == 1 && history[i] == false) {
					que.offer(i);
					history[i] = true;	
				}
			}
			System.out.println(index);
		}
	}

	private static void printArray() {
		for(int arr[] : array) {
			System.out.println(Arrays.toString(arr));
		}
	}
}
