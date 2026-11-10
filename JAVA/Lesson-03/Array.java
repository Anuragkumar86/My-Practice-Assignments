import java.util.Arrays;
import java.util.Scanner;

public class Array {
    
    public static void main(String[] arg){

        Scanner sc = new Scanner(System.in);
        int n = sc.nextInt();

        int[] arr = new int[n];

        for(int i=0; i<n; i++){
            arr[i] = sc.nextInt();
        }

        System.out.println("Original Array: ");
        for(int i: arr){
            System.out.print(i+" ");
        }
        
        int left = 0;
        int right = n-1;
        
        while(left < right){
            int temp = arr[left];
            arr[left] = arr[right];
            arr[right] = temp;
            
            left++;
            right--;
        }
        
        System.out.println("Array after inplace reverse: ");
        for(int i: arr){
            System.out.print(i+" ");
        }
        
        Arrays.sort(arr);
        
        System.out.println("Array after Sorting: ");
        for(int i: arr){
            System.out.print(i+" ");
        }


        sc.close();
    }
}
