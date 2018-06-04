package com.nyx.athena

import org.springframework.boot.test.context.SpringBootTest
import spock.lang.Specification

import static org.springframework.boot.test.context.SpringBootTest.WebEnvironment.RANDOM_PORT

@SpringBootTest(classes = [AthenaApplication], webEnvironment = RANDOM_PORT)
class BaseIntegrationTest extends Specification {
}
