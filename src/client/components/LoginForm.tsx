import type { FC } from "react";
import { useState } from "react";
import { useAuthStore } from "../../store/auth.store";

const LoginForm: FC = () => {
  const { setUser } = useAuthStore();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setUser({
      id: 1,
      name: username,
      email: `${username}@example.com`,
      role: "user",
    });

    localStorage.setItem("user", username)
    window.location.reload() 
  };

  return (
    <>
      <div className="col-lg-12 text-center mt-6">
        <h1>Entrez dans le sanctuaire en révélant votre identité magique !!!</h1>
      </div>
      <div className="col-lg-8 offset-lg-2">
        <form onSubmit={handleSubmit} className="form-magique">
          <div className="mt-3">
            <input
              type="text"
              className="form-control"
              placeholder="votre pseudo"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="mt-3">
            <input
              type="password"
              className="form-control"
              placeholder="votre mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="mt-3 text-center">
            <button type="submit" className="btn btn-magique">
              Connexion magique
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
