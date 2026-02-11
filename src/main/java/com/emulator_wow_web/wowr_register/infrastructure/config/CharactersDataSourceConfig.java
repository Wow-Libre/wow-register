package com.emulator_wow_web.wowr_register.infrastructure.config;

import com.zaxxer.hikari.HikariDataSource;
import jakarta.persistence.EntityManagerFactory;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
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
 * Configuración para la base de datos <b>characters</b> del emulador WoW
 * (characters, guild, guild_member, character_inventory, mail, etc.).
 */
@Configuration
@EnableTransactionManagement
@EnableJpaRepositories(
    basePackages = "com.emulator_wow_web.wowr_register.infrastructure.persistence.characters",
    entityManagerFactoryRef = "charactersEntityManagerFactory",
    transactionManagerRef = "charactersTransactionManager"
)
public class CharactersDataSourceConfig {

    @Bean(name = "charactersDataSource")
    @Primary
    public DataSource charactersDataSource(
            @Value("${spring.datasource.characters.url}") String url,
            @Value("${spring.datasource.characters.username}") String username,
            @Value("${spring.datasource.characters.password}") String password) {
        HikariDataSource ds = new HikariDataSource();
        ds.setJdbcUrl(url);
        ds.setUsername(username);
        ds.setPassword(password);
        ds.setDriverClassName("com.mysql.cj.jdbc.Driver");
        return ds;
    }

    @Bean(name = "charactersEntityManagerFactory")
    @Primary
    public LocalContainerEntityManagerFactoryBean charactersEntityManagerFactory(
            @Qualifier("charactersDataSource") DataSource dataSource) {
        LocalContainerEntityManagerFactoryBean bean = new LocalContainerEntityManagerFactoryBean();
        bean.setDataSource(dataSource);
        bean.setPackagesToScan("com.emulator_wow_web.wowr_register.infrastructure.entities.characters");
        bean.setJpaVendorAdapter(new HibernateJpaVendorAdapter());
        Map<String, Object> jpaProps = new HashMap<>();
        jpaProps.put("hibernate.dialect", "org.hibernate.dialect.MySQLDialect");
        jpaProps.put("hibernate.hbm2ddl.auto", "none");
        bean.setJpaPropertyMap(jpaProps);
        return bean;
    }

    @Bean(name = "charactersTransactionManager")
    @Primary
    public PlatformTransactionManager charactersTransactionManager(
            @Qualifier("charactersEntityManagerFactory") EntityManagerFactory entityManagerFactory) {
        return new JpaTransactionManager(entityManagerFactory);
    }
}
