import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "./ui/table";
import { Badge } from "./ui/badge";

const tableData = [
  {
    id: "1",
    name: "Jean Dupont",
    email: "jean@exemple.com",
    status: "Actif",
    role: "Administrateur",
    lastLogin: "il y a 2 heures",
  },
  {
    id: "2",
    name: "Marie Martin",
    email: "marie@exemple.com",
    status: "Actif",
    role: "Utilisateur",
    lastLogin: "il y a 1 jour",
  },
  {
    id: "3",
    name: "Pierre Moreau",
    email: "pierre@exemple.com",
    status: "Inactif",
    role: "Utilisateur",
    lastLogin: "il y a 5 jours",
  },
  {
    id: "4",
    name: "Sophie Bernard",
    email: "sophie@exemple.com",
    status: "Actif",
    role: "Modérateur",
    lastLogin: "il y a 3 heures",
  },
];

export function DataTable() {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Utilisateurs Récents</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nom</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Rôle</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Dernière Connexion</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((user) => (
              <TableRow key={user.id}>
                <TableCell>{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>
                  <Badge variant={user.status === "Actif" ? "default" : "secondary"}>
                    {user.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-muted-foreground">{user.lastLogin}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}