import React, { useState } from "react";
import axios from "./axios";

export function useAuthSubmit(url, values) {
    const [err, setErr] = useState();

    const handleSubmit = async () => {
        try {
            const { data } = await axios.post(url, values);
            if (!data.success) {
                setErr(true);
            } else {
                location.replace("/");
            }
        } catch (error) {
            console.log("err in useAuthSubmit():", err);
            setErr(true);
        }
    };
    return [err, handleSubmit];
}
