import java.util.Arrays;

public class Main {

    static boolean isAna(String str, String str2){

        if(str.length() != str2.length()){
            return false;
        }
        
        int[] freq1 = new int[26];
        int[] freq2 = new int[26];

        for(int i=0; i<str.length(); i++){
            freq1[str.charAt(i) - 'a']++;
            freq2[str2.charAt(i) - 'a']++;
        }

        return Arrays.equals(freq1, freq2);
    }
    public static void main(String[] arg){
        // StringBuilder str = new StringBuilder();
        // str.append("Hello Anurag Yadav");
        // System.out.println(str);
        // str.insert(3, "INSERT");
        // System.out.println(str);
        // str.replace(10, 12, "ANSH");
        // System.out.println(str);
        // str.setCharAt(7, 'P');
        // System.out.println(str);
        // str.reverse();
        // System.out.println(str);
        // str.delete(2, 5);
        // System.out.println(str);

// `````````````````````````````````````````````````````````````````````````````````````
        String str = "listen";
        String str2 = "silenp";
        System.out.print("Is anagram: ");
        System.out.println(isAna(str, str2));
        
    }
}
