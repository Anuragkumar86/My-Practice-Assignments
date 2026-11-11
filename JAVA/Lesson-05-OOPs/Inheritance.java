

public class Inheritance {
    
    static  class Person {
        
        public
        String name;
        int age;
    
        Person(String name, int age){
            this.name = name;
            this.age = age;
            System.out.println("Hello " + name + " I am from PERSON class");
        }

        void makeSound(){
            System.out.println("I am making sound from Person");
        }
    }
    
    static  class Employee extends Person {
        
        public
        int salary;
        static int count = 0;
    
        Employee(String name, int age, int salary){
            super(name, age);
            this.salary = salary;
            count++;
            System.out.println("Hello " + name + " I am from Employee class with salary: "+ salary);
        }

        @Override 
        void makeSound(){
            System.out.println("I am making sound from Employee");
        }
        
        static void Total(){
            System.out.println("Total count: "+ count);

        }
    }
    
    static class Developer extends Employee {
    
        public
        String role;
    
        Developer(String name, int age, int salary, String role){
            super(name, age, salary);
            this.role = role;
            System.out.println("Hello " + name + " I am from Developer class with salary: "+ salary + "And role: " + role);
        }

        @Override 
        void makeSound(){
            System.out.println("I am making sound from Developer");
        }
    }
    public static void main(String[] arg){
        // Employee pr = new Developer("Anurag", 20, 9999999, "SDE");
        Employee pr = new Employee("Anurag", 20, 44545555);
        // new Employee("Anurag", 20, 44545555);
        // new Employee("Anurag", 20, 44545555);
        // new Employee("Anurag", 20, 44545555);
        // new Employee("Anurag", 20, 44545555);
        // new Employee("Anurag", 20, 44545555);
        // new Employee("Anurag", 20, 44545555);

        // System.out.println(pr.role);
        // pr.makeSound();
        Employee.Total();


        
    }
}