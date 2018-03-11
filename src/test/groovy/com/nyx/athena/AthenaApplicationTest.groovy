package com.nyx.athena

import spock.lang.Specification

class AthenaApplicationTest extends Specification {
    def "Mock"() {
        given:
        def a = 1
        when:
        a = 2
        then:
        a == 2
    }
}
