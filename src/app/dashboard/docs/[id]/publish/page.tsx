import React from "react";

export default function ({ params }: { params: Promise<{ id: string }> }) {
  const { id } = React.use(params);
  return <div>TODO: Export Page for Doc {id}</div>;
}
