package com.nyx.athena.configuration

import org.springframework.context.annotation.Bean
import org.springframework.context.annotation.Configuration
import org.springframework.context.annotation.Primary
import org.springframework.data.rest.core.event.ValidatingRepositoryEventListener
import org.springframework.validation.Validator
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean

@Configuration
class RestValidationConfiguration : RepositoryRestConfigurerAdapter() {
    @Bean
    @Primary
    fun validator(): Validator = LocalValidatorFactoryBean()

    @Override
    override fun configureValidatingRepositoryEventListener(validatingListener: ValidatingRepositoryEventListener) {
        val validator = validator()
        validatingListener.addValidator("beforeCreate", validator)
        validatingListener.addValidator("beforeSave", validator)
    }
}
