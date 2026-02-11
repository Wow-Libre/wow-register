package com.emulator_wow_web.wowr_register.infrastructure.config;

import com.zaxxer.hikari.HikariDataSource;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.orm.jpa.JpaTransactionManager;
import org.springframework.orm.jpa.LocalContainerEntityManagerFactoryBean;
import org.springframework.orm.jpa.vendor.HibernateJpaVendorAdapter;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import javax.sql.DataSource;
import java.util.HashMap;
import java.util.Map;

/**
 * Configuración para la base de datos <b>world</b> del emulador WoW
 * (item_template, creature_template, quest templates, etc.).
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
    basePackages = "com.emulator_wow_web.wowr_register.infrastructure.persistence.world",
    entityManagerFactoryRef = "worldEntityManagerFactory",
    transactionManagerRef = "worldTransactionManager"
)
public class WorldDataSourceConfig {

    @Bean(name = "worldDataSource")
    public DataSource worldDataSource(
            @Value("${spring.datasource.world.url}") String url,
            @Value("${spring.datasource.world.username}") String username,
            @Value("${spring.datasource.world.password}") String password) {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);
        ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
        return ds;
    }

    @Bean(name = "worldEntityManagerFactory")
    public LocalContainerEntityManagerFactoryBean worldEntityManagerFactory(
            @Qualifier("worldDataSource") DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean bean = new LocalContainerEntityManagerFactoryBean();
        bean.setDataSource(dataSource);
        bean.setPackagesToScan("com.emulator_wow_web.wowr_register.infrastructure.entities.world");
        bean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        Map<String, Object> jpaProps = new HashMap<>();
        jpaProps.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        jpaProps.put("hibernate.hbm2ddl.auto", "none");
        bean.setJpaPropertyMap(jpaProps);
        return bean;
    }

    @Bean(name = "worldTransactionManager")
    public PlatformTransactionManager worldTransactionManager(
            @Qualifier("worldEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
