<%@ page language="java" import="java.net.*"%>
<%@ page import="java.io.*"%>
<%@ page import="java.sql.*"%>
<html>
<body bgcolor=cream>
<% 
String s1 = request.getParameter("nm1");
String s2 = request.getParameter("nm2");
Connection con = null;
Statement s = null;
try
{
Class.forName("sun.jdbc.odbc.JdbcOdbcDriver");
con=DriverManager.getConnection("jdbc:odbc:comment");

PreparedStatement ps = con.prepareStatement("insert into comment values(?,?)");
ps.setString(1,s1);
ps.setString(2,s2);
 
ps.executeUpdate();
}
catch(Exception se){out.println(se);}
%>
<p> your record have been submited succefully</p>
</body>
</html>