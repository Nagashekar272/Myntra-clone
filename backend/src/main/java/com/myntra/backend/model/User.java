package com.myntra.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String mobile;
    private String password;
    
    @Column(length = 2000)
    private String address;
    
    @Column(length = 3000)
    private String cartData;
    
    @Column(length = 3000)
    private String wishlistData;
}
