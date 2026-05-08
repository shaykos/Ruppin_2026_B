// Model --> functions that interact with the database

const users = [];

export async function getAllUsers() {
    return users;
}

export async function createUser(user) {
    if(users.find(u => u.email === user.email)) {
        throw new Error('User with this email already exists');
    }
    users.push({
        id: crypto.randomUUID(),
        ...user,
        createdAt: new Date().toISOString()
    });
    return user;
}

export async function updateUser(id, user) {
    const index = users.findIndex(u => u.id === id);
    if (index === -1) {
        throw new Error('User not found');
    }
    users[index] = {
        ...users[index],
        ...user,
        updatedAt: new Date().toISOString()
    };
    return users[index];
}