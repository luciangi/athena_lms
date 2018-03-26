package com.nyx.athena.security.repository

import com.nyx.athena.security.model.Role
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface RoleRepository : CrudRepository<Role, UUID> {
    fun findByAuthority(authority: String): Role
}
