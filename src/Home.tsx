import { useNavigate } from "react-router-dom";

export const Home = () => {

    const nav = useNavigate();

    return (
        <div>
            <h1
                className='text-3xl font-bold underline123 mb-3'
            >
                SW Deckbuilding
            </h1>
            <button
                className='btn btn-primary btn-lg'
                onClick={() => nav('/setup')}
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                Play
            </button>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                </div>
            </div>

            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                    <div className="stats shadow">
                        <div className="stat">
                            <div className="stat-title">Total Page Views</div>
                            <div className="stat-value">89,400</div>
                            <div className="stat-desc">21% more than last month</div>
                        </div>
                    </div>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                    <div className="chat chat-start">
                        <div className="chat-bubble">
                            It's over Anakin,
                            <br />
                            I have the high ground.
                        </div>
                    </div>
                    <div className="chat chat-end">
                        <div className="chat-bubble">You underestimate my power!</div>
                    </div>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                </div>
            </div>
            <div
                className="card bg-base-100 shadow-xl mt-3 mb-5"
            >
                <div
                    className="card-body"
                >
                    <h2
                        className="card-title"
                    >
                        Leaderboard
                    </h2>
                </div>
            </div>
        </div>
    );
};