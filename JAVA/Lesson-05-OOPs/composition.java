
public class composition {

    static class Engine{
        String model;

        Engine(String model){
            this.model = model;
            System.out.println("Engine Constructor");
        }
        
        void detail(){
            System.out.println("Mode of engine is: "+ model);
        }
    }
    
    static class Car{
        Engine engine;
        String name;
        
        Car(Engine engine, String name){
            this.engine = engine;
            this.name = name;
        }
        
        void carDetail(){
            System.out.println("Car name is: "+ name);
            engine.detail();

        }
    }
    public static void main(String[] args){
        Engine engine = new Engine("XYZ-200-t");
        Car car = new Car(engine, "Safari");

        car.carDetail();
    }
}
