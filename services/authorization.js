const { defineAbility } = require('@casl/ability')

const unauthenticatedAbility = defineAbility((can) => {
  can('get', '/login')
  can('post', '/login')
})

function defineAuthenticatedAbilities (can) {
  can('get', '/login')
  can('post', '/login')
  can('get', '/logout')
  can('get', '/')
  can('get', '/api/users')
  can('get', '/change-password')
  can('post', '/change-password')
}

const authenticatedAbility = defineAbility((can) => {
  defineAuthenticatedAbilities(can)
})

function defineAdminAbilities (can) {
  can('delete', '/api/users/:username')
  can('put', '/api/users/:username')
  can('get', '/api/users/:username')
  can('get', '/users')
  can('get', '/edit-user')
  can('post', '/edit-user')
  can('get', '/add-user')
  can('post', '/add-user')
  can('get', '/delete-user')
  can('post', '/delete-user')
}

const adminAbility = defineAbility((can) => {
  defineAuthenticatedAbilities(can)
  defineAdminAbilities(can)
})

const abilitityMap = {
  user: authenticatedAbility,
  admin: adminAbility,
  unauthenticated: unauthenticatedAbility
}

class AuthorizationService {
  isAllowed (req) {
    if (req.user == null) {
      req.user = {
        role: 'unauthenticated'
      }
    }
    const user = req.user

    const ability = abilitityMap[user.role ?? 'unauthenticated']
    const isAllowed = ability.can(req.method.toLowerCase(), req.path)
    return isAllowed
  }
}

const authzService = new AuthorizationService()

module.exports = {
  authorizationService: authzService
}
