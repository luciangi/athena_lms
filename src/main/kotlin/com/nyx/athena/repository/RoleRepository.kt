package com.nyx.athena.repository

import com.nyx.athena.model.Role
import org.springframework.data.repository.CrudRepository
import org.springframework.stereotype.Repository
import java.util.*

@Repository
interface RoleRepository : CrudRepository<Role, UUID> {
    fun findByAuthority(authority: String): Role
}
