package org.ASpringBoot;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class App {
    public static void main( String[] args ){
        System.out.println( "ASpringBoot 동작 합니다" );
        
        
        org.ANormalProject.App.IM_OTHER();
        
        
        SpringApplication.run(App.class, args);
    }
}
