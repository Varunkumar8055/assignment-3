type Workout = {
    type: string;
    duration: number; // in minutes
    caloriesBurned: number;
    date: Date;
};

type User = {
    id: string;
    name: string;
    age: number;
    weight: number; // in kg
    height: number; // in cm
};

const users: Map<string, User> = new Map();
const workouts: Map<string, Workout[]> = new Map();

function generateRandomId(): string {
    return Math.random().toString(36).substr(2, 9);
}

function addUser(user: Omit<User, 'id'>): string {
    const id = generateRandomId();
    if (users.has(id)) {
        throw new Error(`User with id ${id} already exists.`);
    }
    users.set(id, { ...user, id });
    return id;
}

function logWorkout(userId: string, workout: Workout): void {
    if (!users.has(userId)) {
        throw new Error(`User with id ${userId} does not exist.`);
    }
    if (!workouts.has(userId)) {
        workouts.set(userId, []);
    }
    workouts.get(userId)!.push(workout);
}

function getAllWorkoutsOf(userId: string): Workout[] {
    if (!users.has(userId)) {
        throw new Error(`User with id ${userId} does not exist.`);
    }
    return workouts.get(userId) || [];
}

function getAllWorkoutsByType(userId: string, type: string): Workout[] {
    if (!users.has(userId)) {
        throw new Error(`User with id ${userId} does not exist.`);
    }
    return (workouts.get(userId) || []).filter(workout => workout.type === type);
}

function getUsers(): User[] {
    return Array.from(users.values());
}

function getUser(id: string): User | undefined {
    return users.get(id);
}

function updateUser(id: string, updatedFields: Partial<Omit<User, 'id'>>): void {
    if (!users.has(id)) {
        throw new Error(`User with id ${id} does not exist.`);
    }
    const user = users.get(id)!;
    const updatedUser = { ...user, ...updatedFields };
    users.set(id, updatedUser);
}

// Example usage:
const userId = addUser({ name: 'John Doe', age: 30, weight: 70, height: 175 });
logWorkout(userId, { type: 'running', duration: 30, caloriesBurned: 300, date: new Date() });

console.log(getAllWorkoutsOf(userId));
console.log(getAllWorkoutsByType(userId, 'running'));
console.log(getUsers());
console.log(getUser(userId));

updateUser(userId, { weight: 72 });
console.log(getUser(userId));