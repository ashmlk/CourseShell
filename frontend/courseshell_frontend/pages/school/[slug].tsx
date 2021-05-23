import { useQuery } from "@apollo/client";
import { useRouter } from "next/dist/client/router"
import React, { useEffect } from "react";

const SCHOOL_OBJECT = gql `
query ($slug: String) {
    university(name: "", universityUuid: "", slug: $slug) {
      name
      country
      state
      studentCount
      instructorCount
      courseCount
      slug
      absoluteUrl
    }
  }
`;

// const SCHOOL_COURSES = gql `
// `;

// const SCHOOL_INSTRUCTORS = gql `
// `;



export default function SchoolPage (props) {

    const router = useRouter();
    const schoolSlug = router.query;
    const [schoolObject, setSchoolObject] = React.useState({});

    const {loading: schoolLoading, error: schoolError, data: schoolData} = useQuery(SCHOOL_OBJECT, {
        client: props.graphqlClient
    })

    return (
        <div>
            
        </div>
    )
}