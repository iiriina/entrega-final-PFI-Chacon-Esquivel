import MKTypography from "components/MKTypography";

// Images

const date = new Date().getFullYear();

export default {
  copyright: (
    <MKTypography variant="button" fontWeight="regular">
      Todos los derechos reservados. Copyright &copy; {date} Tech Insert por Iri y Cande.
    </MKTypography>
  ),
};
