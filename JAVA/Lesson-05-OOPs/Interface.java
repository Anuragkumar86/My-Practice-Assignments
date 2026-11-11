interface Printable {
    static void show() {
        System.out.println("Static method from Printable interface");
    }
}

class MultiFunctionPrinter implements Printable {
    // This is NOT overriding. This is a brand new, independent static method in this class!
    public static void show() {
        System.out.println("Static method from MultiFunctionPrinter class");
    }
}

public class Interface {
    public static void main(String[] args) {
        // Case 1: Called via the Interface name
        // Printable.show(); 
        // Output: "Static method from Printable interface"

        // Case 2: Called via the Class name
        // MultiFunctionPrinter.show(); 
        // Output: "Static method from MultiFunctionPrinter class"

        Printable p = new MultiFunctionPrinter();
        // p.show();
    }
}