enum Icons {
  smile = 'smile',
  house = 'house',
  fire = 'fire',
}

enum Features {
  comfort = 'comfort',
  walls = 'walls',
  convenience = 'convenience',
  windows = 'windows',
  coziness = 'coziness',
  fireplace = 'fireplace',
}

const initValues = {
  comfort: {
    title: Features.comfort,
    description: Features.walls,
    icon: Icons.smile,
  },
  convenience: {
    title: Features.convenience,
    description: Features.windows,
    icon: Icons.house,
  },
  cozy: {
    title: Features.coziness,
    description: Features.fireplace,
    icon: Icons.fire,
  },
};

export default initValues;
