function hasPermission(user, permissionsNeeded) {
  const matchedPermissions = user.permissions.filter(permissionTheyHave =>
    permissionsNeeded.includes(permissionTheyHave)
  );
  if (!matchedPermissions.length) {
    throw new Error(
      `Vous n'avez pas la permission nécessaire qui est : ${permissionsNeeded}. Vous avez : ${user.permissions} `
    );
  }
}

exports.hasPermission = hasPermission;
