package com.nyx.athena

import groovy.sql.Sql
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

import javax.sql.DataSource
import java.sql.Connection

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT

@SpringBootTest(classes = [AthenaApplication], webEnvironment = RANDOM_PORT)
class BaseIntegrationTest extends Specification {
    @Autowired
    private DataSource dataSource

    def cleanup() {
        Connection connection = dataSource.getConnection()
        Sql sql = new Sql(connection)

        // Disable FK
        sql.execute("SET REFERENTIAL_INTEGRITY FALSE")

        // Find all tables and truncate them
        sql.rows("SELECT TABLE_NAME FROM INFORMATION_SCHEMA.TABLES  where TABLE_SCHEMA='PUBLIC'")
                .collect { sql.executeUpdate("TRUNCATE TABLE ${it.'TABLE_NAME'}".toString()) }

        // Idem for sequences
        sql.rows("SELECT SEQUENCE_NAME FROM INFORMATION_SCHEMA.SEQUENCES WHERE SEQUENCE_SCHEMA='PUBLIC'")
                .collect { sql.executeUpdate("ALTER SEQUENCE ${it.'SEQUENCE_NAME'} RESTART WITH 1".toString()) }

        // Enable FK
        sql.execute("SET REFERENTIAL_INTEGRITY TRUE")
        sql.close()
        connection.close()
    }
}
