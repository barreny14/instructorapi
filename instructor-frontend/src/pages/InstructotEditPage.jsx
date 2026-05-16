import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InstructorForm from "../components/InstructorForm";
import { getInstructorById, updateInstructor } from "../services/instructorApi";

function InstructorEditPage() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [instructor, setInstructor] = useState(null);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        async function loadInstructor() {
            try {
                const data = await getInstructorById(id);
                setInstructor(data);
            } catch (error) {
                console.error(error);
                setError(`Instructor not found with ID: ${id}`);
            } finally {
                setLoading(false);
            }
        }

        loadInstructor();
    }, [id]);

    async function handleUpdateInstructor(instructorData) {
        setMessage("");
        setError("");

        try {
            await updateInstructor(id, instructorData);

            setMessage("Instructor updated successfully.");

            setTimeout(() => {
                navigate("/instructors");
            }, 700);
        } catch (error) {
            console.error(error);
            setError("Could not update instructor. Please check your input.");
        }
    }

    if (loading) {
        return <p>Loading instructor...</p>;
    }

    if (error && !instructor) {
        return (
            <section>
                <h1>Instructor Not Found</h1>
                <p className="error-message" style={{ color: "red" }}>{error}</p>
                <button onClick={() => navigate("/instructors")}>Back to Instructors</button>
            </section>
        );
    }

    return (
        <section>
            <div className="page-header">
                <div>
                    <h1>Edit Instructor</h1>
                    <p>Update the selected instructor.</p>
                </div>
            </div>

            {message && <p className="success-message" style={{ color: "green", fontWeight: "bold" }}>{message}</p>}
            {error && <p className="error-message" style={{ color: "red", fontWeight: "bold" }}>{error}</p>}

            <InstructorForm
                initialData={instructor}
                onSubmit={handleUpdateInstructor}
                buttonText="Update Instructor"
            />
        </section>
    );
}

export default InstructorEditPage;