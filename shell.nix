with import (fetchTarball "https://github.com/NixOS/nixpkgs/archive/24.05.tar.gz") { };

stdenv.mkDerivation {
  name = "use-screen";

  buildInputs = with pkgs; [
    git
    nodejs_20
  ];
}

