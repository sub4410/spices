import React from 'react';

const PasswordInfo = () => {
    return (
        <div className="text-sm text-gray-600 mt-2">
            <p>Password must:</p>
            <ul className="list-disc list-inside">
                <li>Be at least 8 characters long</li>
                <li>Include at least one uppercase letter</li>
                <li>Include at least one number</li>
                <li>Include at least one special character (!@#$%^&*)</li>
            </ul>
        </div>
    );
};

export default PasswordInfo;