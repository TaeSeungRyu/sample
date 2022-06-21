
public class 이진변환_반복하기 {

	public static void main(String[] args) {
		String s = "1111111";
		solution(s);	
	}

    public static int[] solution(String s) {
        int[] answer = {0, 0};

        StringBuffer buff = new StringBuffer();
        while(!s.equals("1")) {
            char[] array = s.toCharArray();
            for(char a : array) {
            	if(a != '0') {
            		buff.append(a);
            	} else {
            		answer[1]++;
            	}
            }
            answer[0]++;
            s = Integer.toBinaryString(buff.toString().length());  
            buff.delete(0, buff.length());
        }
        return answer;
    }
}
