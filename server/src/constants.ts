export enum Role {
    SUPER_ADMIN = 'SUPER_ADMIN',
    HR_MANAGER = 'HR_MANAGER',
    TEAM_LEAD = 'TEAM_LEAD',
    EMPLOYEE = 'EMPLOYEE',
    ACCOUNTANT = 'ACCOUNTANT',
    SECURITY_STAFF = 'SECURITY_STAFF'
}

export enum UserStatus {
    ACTIVE = 'ACTIVE',
    INACTIVE = 'INACTIVE'
}

export enum AttendanceStatus {
    PRESENT = 'PRESENT',
    ABSENT = 'ABSENT',
    LATE = 'LATE',
    HALF_DAY = 'HALF_DAY',
    ON_LEAVE = 'ON_LEAVE'
}

export enum LeaveStatus {
    PENDING = 'PENDING',
    APPROVED = 'APPROVED',
    REJECTED = 'REJECTED',
    CANCELLED = 'CANCELLED'
}

export enum TaskPriority {
    LOW = 'LOW',
    MEDIUM = 'MEDIUM',
    HIGH = 'HIGH',
    CRITICAL = 'CRITICAL'
}

export enum TaskStatus {
    TODO = 'TODO',
    IN_PROGRESS = 'IN_PROGRESS',
    BLOCKED = 'BLOCKED',
    COMPLETED = 'COMPLETED'
}
