package com.nyx.athena.repository

import com.jayway.restassured.RestAssured
import com.jayway.restassured.response.Response
import com.nyx.athena.BaseIntegrationTest
import com.nyx.athena.model.AthenaUser
import com.nyx.athena.model.Role
import com.nyx.athena.model.Subject
import groovy.json.JsonSlurper
import org.springframework.beans.factory.annotation.Autowired
import org.springframework.security.crypto.password.PasswordEncoder

import static com.jayway.restassured.http.ContentType.JSON
import static org.apache.http.HttpStatus.SC_NOT_FOUND
import static org.apache.http.HttpStatus.SC_OK

class SubjectRepositoryEndpointTest extends BaseIntegrationTest {
    @Autowired
    private PasswordEncoder passwordEncoder
    @Autowired
    private AthenaUserRepository athenaUserRepository
    @Autowired
    private SubjectRepository subjectRepository

    def "test HTTP GET method without an authenticated user"() {
        when: "Calling the subjects endpoint without an authenticated user"
        Response response = RestAssured.given()
                .contentType(JSON)
                .get("/api/subjects")

        then: "The response status code is SC_NOT_FOUND (404)"
        response.statusCode() == SC_NOT_FOUND
    }

    def "test HTTP GET with an user with the proper authorization"() {
        def username = "student"
        def password = "student"
        def subjectName = "NAME"
        def subjectDescription = "DESCRIPTION"

        setup:
        AthenaUser athenaUser = new AthenaUser(username, password, "e@e.com")
        athenaUser.roles = [new Role(Role.Authority.ROLE_ADMIN.name())]
        athenaUserRepository.save(athenaUser)
        subjectRepository.save(new Subject(subjectName, subjectDescription))

        when: "Calling the subjects endpoint"
        Response response = RestAssured.given()
                .auth()
                .preemptive()
                .basic(username, password)
                .contentType(JSON)
                .get("/api/subjects")
        List<Map> contentJson = new JsonSlurper().parseText(response.body().print())["content"] as List<Map>

        then: "The response status code is SC_OK (200)"
        response.statusCode() == SC_OK

        and: "The response contains the only saved subject"
        contentJson.size() == 1
        with(contentJson[0]) {
            name == subjectName
            description == subjectDescription
        }
    }
}
