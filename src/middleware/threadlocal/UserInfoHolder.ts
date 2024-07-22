import { AsyncLocalStorage } from "async_hooks"

const UserInfoHolder = new AsyncLocalStorage<Map<string, any>>()

export default UserInfoHolder