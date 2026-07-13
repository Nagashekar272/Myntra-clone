package com.myntra.backend.component;

import com.myntra.backend.model.Product;
import com.myntra.backend.repository.ProductRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.Arrays;

@Component
public class DataInitializer implements CommandLineRunner {

    private final ProductRepository productRepository;

    public DataInitializer(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (productRepository.count() == 0) {
            Product p1 = new Product(null, "Men's Solid T-Shirt", "Men", "Top Wear", "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 499.0, 999.0, 50, "BULLMER", "Comfortable cotton t-shirt", "S, M, L, XL");
            Product p2 = new Product(null, "Women's Ethnic Kurta", "Women", "Ethnic", "https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 899.0, 1999.0, 55, "Anouk", "Elegant ethnic kurta", "S, M, L");
            Product p3 = new Product(null, "Kids Printed T-Shirt", "Kids", "Top Wear", "https://images.unsplash.com/photo-1519238396827-04870f72dd37?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 299.0, 599.0, 50, "Gini & Jony", "Fun printed t-shirt for kids", "2-4Y, 4-6Y, 6-8Y");
            Product p4 = new Product(null, "Men's Casual Shoes", "Men", "Footwear", "https://images.unsplash.com/photo-1491553895911-0055eca6402d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 1299.0, 2499.0, 48, "Puma", "Stylish casual sneakers", "7, 8, 9, 10");
            Product p5 = new Product(null, "Women's Denim Jacket", "Women", "Western", "https://images.unsplash.com/photo-1551537482-f209bfc44ce6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 1499.0, 2999.0, 50, "DressBerry", "Classic denim jacket", "S, M, L");
            Product p6 = new Product(null, "Wooden Coffee Table", "Furnitures", "Living Room", "https://images.unsplash.com/photo-1533090481720-856c6e3c1fdc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 4500.0, 8000.0, 43, "HomeTown", "Solid wood coffee table", "Standard");
            Product p7 = new Product(null, "Matte Lipstick", "Beauty", "Makeup", "https://images.unsplash.com/photo-1586495777744-4413f21062fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 399.0, 799.0, 50, "SWISS BEAUTY", "Long-lasting matte lipstick", "Onesize");
            Product p8 = new Product(null, "Men's Formal Shirt", "Men", "Top Wear", "https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 899.0, 1599.0, 43, "MANQ", "Sharp formal shirt", "38, 40, 42, 44");
            Product p9 = new Product(null, "Women's Western Dress", "Women", "Western", "https://images.unsplash.com/photo-1572804013309-59a88b7e92f1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 1199.0, 2499.0, 52, "SASSAFRAS", "Trendy western dress", "S, M, L");
            Product p10 = new Product(null, "Sofa Set 3 Seater", "Furnitures", "Living Room", "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 12500.0, 20000.0, 37, "Urban Ladder", "Comfortable 3 seater sofa", "Standard");

            productRepository.saveAll(Arrays.asList(p1, p2, p3, p4, p5, p6, p7, p8, p9, p10));
            
            System.out.println("Sample data initialized to MySQL Database!");
        }
    }
}
