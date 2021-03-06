package views

import org.specs2.mutable.Specification
import models.jbehave.JBehaveComposite

class JBehaveCompositesSpec extends Specification {

  "jBehaveComposites#render" should {

    val compositePackage = "com.technologyconversations.test"
    val compositeClass = "TcBddComposites"
    val steps = List("Given something", "When else", "Then OK")
    val composite = JBehaveComposite("Given this is my composite", steps)
    val stepsWithParams = List("""Given "my" <param1>""", "When <param2>", "Then <param3>")
    val compositeWithParams = JBehaveComposite("""When this is "my" <param1>, <param2> and <param3>""", stepsWithParams)
    val out = views.html.jBehaveComposites.render(
      compositePackage,
      compositeClass,
      List(composite, compositeWithParams)
    ).toString().trim

    "output package statement" in {
      out must contain(s"package $compositePackage;")
    }

    "output import statements" in {
      out must contain("import org.jbehave.core.annotations.*;")
      out must contain("import com.technologyconversations.bdd.steps.util.BddVariable;")
    }

    "output class statement" in {
      out must contain(s"public class $compositeClass {")
    }

    "output step annotation" in {
      out must contain(s"""@Given("this is my composite")""")
    }

    "output step annotation with double quote escaped" in {
      out must contain("""@When("this is \"my\" <param1>, <param2> and <param3>")""")
    }

    "output composite annotation" in {
      out must contain(steps.mkString("""@Composite(steps = {"""", """", """", """"})"""))
    }

    "output composite annotation steps with double quotes escaped" in {
      out must contain("""Given \"my\" <param1>""")
    }

    "output composite method" in {
      out must contain("""public void compositeStep0() { }""")
    }

    "output composite methods using unique names" in {
      out must contain("""public void compositeStep1(""")
    }

    "output composite methods with params" in {
      out must contain("""(@Named("param1") BddVariable param1, @Named("param2") BddVariable param2""")
    }

    "output } at the end" in {
      out must endWith("}")
    }

  }

}
