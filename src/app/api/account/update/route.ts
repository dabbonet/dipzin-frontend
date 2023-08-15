import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const formData = await request.formData();

  const file = formData.get('file');
  const id = formData.get('id');
  const username = formData.get('username');
  const name = formData.get('name');
  const country = formData.get('country');
  const bio = formData.get('bio');
  const job_title = formData.get('job_title');
  const auth = formData.get('auth');
  const email = formData.get('email');

  if (file) {
    const uploadData = new FormData();

    uploadData.append("ref", "plugin::users-permissions.user");
    uploadData.append("field", "avatar");
    uploadData.append("path", "profiles");
    uploadData.append("refId", id);
    uploadData.append("files", file);

    const upload = await fetch('https://rah.dipzin.com/api/upload', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${auth}`
      },
      body: uploadData
    });
    
    const uploadResponse = await upload.json();
  }

  const response = await fetch(`https://rah.dipzin.com/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${auth}`
    },
    body: JSON.stringify({
      data: {
        username,
        country,
        bio,
        name,
        job_title,
        email
      }
    })
  });

  const data = await response.json();
  return NextResponse.json(data, { status: response.status });
}
