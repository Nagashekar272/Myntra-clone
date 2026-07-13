package com.myntra.backend.controller;

import com.myntra.backend.model.Product;
import com.myntra.backend.repository.ProductRepository;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/products")
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductRepository productRepository;

    public ProductController(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @GetMapping
    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }

    @GetMapping("/category/{category}")
    public List<Product> getProductsByCategory(@PathVariable String category) {
        return productRepository.findByCategory(category);
    }

    @GetMapping("/search")
    public List<Product> searchProducts(@RequestParam String q) {
        return productRepository.findByNameContainingIgnoreCaseOrBrandContainingIgnoreCase(q, q);
    }

    @GetMapping("/{id}")
    public Product getProductById(@PathVariable Long id) {
        return productRepository.findById(id).orElse(null);
    }

    @PostMapping
    public Product addProduct(@RequestBody Product product) {
        return productRepository.save(product);
    }

    @PutMapping("/{id}")
    public Product updateProduct(@PathVariable Long id, @RequestBody Product productDetails) {
        Product product = productRepository.findById(id).orElseThrow();
        product.setName(productDetails.getName());
        product.setBrand(productDetails.getBrand());
        product.setCategory(productDetails.getCategory());
        product.setSubCategory(productDetails.getSubCategory());
        product.setPrice(productDetails.getPrice());
        product.setOriginalPrice(productDetails.getOriginalPrice());
        product.setDiscountPercentage(productDetails.getDiscountPercentage());
        product.setImageUrl(productDetails.getImageUrl());
        product.setDescription(productDetails.getDescription());
        product.setSizes(productDetails.getSizes());
        return productRepository.save(product);
    }

    @DeleteMapping("/{id}")
    public void deleteProduct(@PathVariable Long id) {
        productRepository.deleteById(id);
    }
}
