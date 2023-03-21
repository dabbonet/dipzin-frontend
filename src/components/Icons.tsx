



const FacebookIcon = () => {
    return (
        <svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
            preserveAspectRatio="xMidYMid meet"
        >
            <g clipPath="url(#clip0_1192_55332)">
                <path
                    d="M17.3921 13.3981L18.0532 9.08738H13.9173V6.29126C13.9173 5.11194 14.4952 3.96116 16.3476 3.96116H18.228V0.291262C18.228 0.291262 16.5215 0 14.8898 0C11.4835 0 9.25711 2.06447 9.25711 5.80194V9.08738H5.4707V13.3981H9.25711V23.8188C10.8011 24.0604 12.3733 24.0604 13.9173 23.8188V13.3981H17.3921Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_1192_55332">
                    <rect width={24} height={24} fill="currentColor" />
                </clipPath>
            </defs>
        </svg >
    )
}
const GoogleIcon = () => {
    return (
        <svg
            width={24}
            height={25}
            viewBox="0 0 24 25"
            xmlns="http://www.w3.org/2000/svg"
            className="flex-grow-0 flex-shrink-0 w-6 h-6 relative"
            preserveAspectRatio="xMidYMid meet"
        >
            <g clipPath="url(#clip0_1192_55329)">
                <path
                    d="M23.7663 12.8759C23.7663 12.0601 23.7001 11.24 23.559 10.4375H12.2402V15.0585H18.722C18.453 16.5488 17.5888 17.8672 16.3233 18.705V21.7033H20.1903C22.4611 19.6133 23.7663 16.5268 23.7663 12.8759Z"
                    fill="currentColor"
                />
                <path
                    d="M12.2391 24.599C15.4756 24.599 18.205 23.5363 20.1936 21.702L16.3266 18.7037C15.2507 19.4356 13.8618 19.8501 12.2435 19.8501C9.11291 19.8501 6.45849 17.738 5.50607 14.8984H1.51562V17.9894C3.55274 22.0416 7.70192 24.599 12.2391 24.599Z"
                    fill="currentColor"
                />
                <path
                    d="M5.50082 14.8984C4.99816 13.408 4.99816 11.7942 5.50082 10.3038V7.21289H1.51478C-0.187219 10.6037 -0.187219 14.5985 1.51478 17.9893L5.50082 14.8984Z"
                    fill="currentColor"
                />
                <path
                    d="M12.2391 5.34927C13.9499 5.32281 15.6034 5.96658 16.8425 7.14828L20.2685 3.72223C18.0991 1.68511 15.2198 0.565143 12.2391 0.600418C7.70192 0.600418 3.55274 3.15783 1.51562 7.21442L5.50166 10.3054C6.44967 7.46134 9.1085 5.34927 12.2391 5.34927Z"
                    fill="currentColor"
                />
            </g>
            <defs>
                <clipPath id="clip0_1192_55329">
                    <rect width={24} height={24} fill="currentColor" transform="translate(0 0.599609)" />
                </clipPath>
            </defs>
        </svg>
    )
}


const Icons = {
    GoogleIcon,
    FacebookIcon
}

export default Icons