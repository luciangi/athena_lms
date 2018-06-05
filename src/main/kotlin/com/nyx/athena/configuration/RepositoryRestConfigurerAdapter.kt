package com.nyx.athena.configuration

import org.springframework.beans.factory.annotation.Autowired
import org.springframework.data.rest.core.config.RepositoryRestConfiguration
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurerAdapter
import org.springframework.stereotype.Component
import javax.persistence.EntityManager

@Component
class RepositoryRestConfigurerAdapter : RepositoryRestConfigurerAdapter() {
    @Autowired
    private lateinit var entityManager: EntityManager

    override fun configureRepositoryRestConfiguration(config: RepositoryRestConfiguration?) {
        val entities = entityManager.metamodel.entities
                .fold(ArrayList<Class<*>>(), { accumulator, entity -> accumulator.add(entity.javaType); accumulator })
                .toTypedArray()
        config!!.exposeIdsFor(*entities)
    }
}
