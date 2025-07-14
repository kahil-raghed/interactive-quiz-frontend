function parseJwt(token: string) {
  var base64Url = token?.split(" ")[1].split(".")[1];
  var base64 = base64Url?.replace(/-/g, "+").replace(/_/g, "/");
  var jsonPayload = decodeURIComponent(
    window
      .atob(base64)
      .split("")
      .map(function (c) {
        return "%" + ("00" + c.charCodeAt(0).toString(16)).slice(-2);
      })
      .join("")
  );

  return JSON.parse(jsonPayload);
}

export const isAdmin = () => {
  console.log(parseJwt(localStorage.getItem("token") as string));

  if (parseJwt(localStorage.getItem("token") as string).role === "admin") {
    return true;
  }

  return false;
};
