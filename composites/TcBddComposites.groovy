package composites;

import org.jbehave.core.annotations.*;
import com.technologyconversations.bdd.steps.util.BddVariable;

public class TcBddComposites {
    
        @Then("Web user is in the home screen")
        @Composite(steps = ["Then Web element pageTitle should have text New Story"])
        def compositeStep0() { }
    
        @Then("Web story is deleted")
        @Composite(steps = ["Then File public/stories/testDirectory/testStory.story does NOT exist"])
        def compositeStep1() { }
    
        @Then("story is running")
        @Composite(steps = ["Then Web element runnerStatus should have text Story run is in progress"])
        def compositeStep2() { }
    
        @When("Web user fills in the new story form")
        @Composite(steps = ["When Web user sets value newStory to the element storyName", "When Web user sets value story description to the element storyDescription", "When Web user clicks the element addStoryMeta", "When Web user sets value story meta 1 to the element storyMeta1", "When Web user sets value accomplish something to the element storyNarrativeInOrderTo", "When Web user sets value user to the element storyNarrativeAsA", "When Web user sets value do something to the element storyNarrativeIWantTo", "When Web user clicks the element addStoryGivenStory", "When Web user sets value path/to/my/given/story to the element storyGivenStory1", "When Web user clicks the element addStoryLifecycleBeforeStep", "When Web user sets value Given this is before step to the element storyLifecycleBeforeStep1", "When Web user clicks the element addStoryLifecycleAfterStep", "When Web user sets value Given this is after step to the element storyLifecycleAfterStep1"])
        def compositeStep3() { }
    
        @Given("Web user is in the New Story screen")
        @Composite(steps = ["Given File public/stories/testDirectory/newStory.story does NOT exist", "Given Web address /page/stories/new/testDirectory/ is opened"])
        def compositeStep4() { }
    
        @When("Web user fills in the existing story form")
        @Composite(steps = ["When Web user sets value story description to the element storyDescription", "When Web user sets value story meta 1 to the element storyMeta1", "When Web user sets value accomplish something to the element storyNarrativeInOrderTo", "When Web user sets value user to the element storyNarrativeAsA", "When Web user sets value do something to the element storyNarrativeIWantTo", "When Web user clicks the element addStoryGivenStory", "When Web user sets value path/to/my/given/story to the element storyGivenStory1", "When Web user sets value Given this is before step to the element storyLifecycleBeforeStep1", "When Web user sets value Given this is after step to the element storyLifecycleAfterStep1"])
        def compositeStep5() { }
    
        @Then("Web story is renamed")
        @Composite(steps = ["Then File public/stories/testDirectory/@storyName.story exists"])
        def compositeStep6() { }
    
        @Then("Web user is in the stories modal screen")
        @Composite(steps = ["Then Web element modalHeader should have text Browse Stories"])
        def compositeStep7() { }
    
        @When("Web user adds scenario to the story form")
        @Composite(steps = ["When Web user clicks the element addScenario", "When Web user clicks the element scenario1Panel", "When Web user sets value Scenario 1 Title to the element scenario1Title", "When Web user clicks the element addScenario1Meta", "When Web user sets value Scenario1Meta1 to the element scenario1Meta1", "When Web user clicks the element addScenario1Step", "When Web user sets value When step is written to the element scenario1Step1", "When Web user clicks the element addScenario1Step", "When Web user sets value Then there is still hope to the element scenario1Step2"])
        def compositeStep8() { }
    
        @Then("story is NOT running")
        @Composite(steps = ["Given Web timeout is 30 seconds", "Then Web element runnerStatus should NOT have text Story run is in progress"])
        def compositeStep9() { }
    
        @Given("Web user is in the Story page with failed steps")
        @Composite(steps = ["When File is copied from public/stories/test/dummyFailed.story to public/stories/testDirectory/testFailedStory.story", "Given Web address /page/stories/view/testDirectory/testFailedStory is opened", "When Web user clicks the element expandPanels"])
        def compositeStep10() { }
    
        @Then("Web story is reverted to the original version")
        @Composite(steps = ["Then Web element storyDescription should NOT have value @storyDescription", "Then Web element storyMeta1 should NOT have value @storyMeta1", "Then Web element storyNarrativeInOrderTo should NOT have value @storyNarrativeInOrderTo", "Then Web element storyNarrativeAsA should NOT have value @storyNarrativeAsA", "Then Web element storyNarrativeIWantTo should NOT have value @storyNarrativeIWantTo", "Then Web element storyGivenStory1 should NOT have value @storyGivenStory1", "Then Web element storyLifecycleBeforeStep1 should NOT have value @storyLifecycleBeforeStep1"])
        def compositeStep11() { }
    
        @Then("Web user is in the Runner Selector modal screen")
        @Composite(steps = ["Then Web element modalHeader should have text Runner Selector"])
        def compositeStep12() { }
    
        @Then("Web story is saved")
        @Composite(steps = ["Given Web address /page/stories/view/testDirectory/@storyName is opened", "Given Web page is refreshed", "When Web user clicks the element scenariosPanel", "Then Web element storyName should have value @storyName", "When Web user clicks the element storyPanel", "When Web user clicks the element storyDescriptionPanel", "Then Web element storyDescription should have value @storyDescription", "When Web user clicks the element storyMetaPanel", "Then Web element storyMeta1 should have value @storyMeta1", "When Web user clicks the element storyNarrativePanel", "Then Web element storyNarrativeInOrderTo should have value @storyNarrativeInOrderTo", "Then Web element storyNarrativeAsA should have value @storyNarrativeAsA", "Then Web element storyNarrativeIWantTo should have value @storyNarrativeIWantTo", "When Web user clicks the element storyGivenStoriesPanel", "Then Web element storyGivenStory1 should have value @storyGivenStory1", "When Web user clicks the element storyLifecyclePanel", "Then Web element storyLifecycleBeforeStep1 should have value @storyLifecycleBeforeStep1", "When Web user clicks the element scenariosPanel"])
        def compositeStep13() { }
    
        @When("Web single story runner is run")
        @Composite(steps = ["Given Web page is refreshed", "When Web user clicks the element runStory", "Then Web element modalHeader should have text Runner Parameters", "When Web user clicks the element confirmRunStory"])
        def compositeStep14() { }
    
        @Then("Web user is in the View Composites screen")
        @Composite(steps = ["Then Web element saveComposites should have text Update Composites"])
        def compositeStep15() { }
    
        @Given("Web user is in the Story page with all successful steps")
        @Composite(steps = ["When File is copied from public/stories/test/dummySuccess.story to public/stories/testDirectory/testSuccessStory.story", "Given Web address /page/stories/view/testDirectory/testSuccessStory is opened", "When Web user clicks the element expandPanels"])
        def compositeStep16() { }
    
        @Given("Web user is in the Story screen with pending steps")
        @Composite(steps = ["When File is copied from public/stories/test/dummyPending.story to public/stories/testDirectory/testPendingStory.story", "Given Web address /page/stories/view/testDirectory/testPendingStory is opened", "When Web user clicks the element expandPanels"])
        def compositeStep17() { }
    
        @Given("Web user is in the View Composites screen")
        @Composite(steps = ["Given variable className has value TestViewComposites", "When File is copied from test/mocks/@className.groovy.tmpl to composites/@className.groovy", "Given Web address /page/composites/@className.groovy is opened", "Given Web page is refreshed"])
        def compositeStep18() { }
    
        @Then("Web story scenario is saved")
        @Composite(steps = ["Given Web address /page/stories/view/testDirectory/@storyName is opened", "Given Web page is refreshed", "When Web user clicks the element scenario1Panel", "Then Web element scenario1Title should have value @scenario1Title", "Then Web element scenario1Meta1 should have value @scenario1Meta1", "Then Web element scenario1Step1 should have value @scenario1Step1", "Then Web element scenario1Step2 should have value @scenario1Step2"])
        def compositeStep19() { }
    
        @Given("Web user is in the View Story page")
        @Composite(steps = ["Given variable storyName has value testStory", "When File is copied from public/stories/test/dummy.story to public/stories/testDirectory/testStory.story", "Given Web address /page/stories/view/testDirectory/testStory is opened", "When Web user clicks the element expandPanels"])
        def compositeStep20() { }
    
        @Then("Web user is in the New Composites screen")
        @Composite(steps = ["Then Web element saveComposites should have text Create New Composites"])
        def compositeStep21() { }
    
        @Given("Web user is in the New Composites screen")
        @Composite(steps = ["Given variable className has value TestComposites", "Given File composites/@className.groovy does NOT exist", "Given Web address /page/composites/@className.groovy is opened", "Given Web page is refreshed", "When Web user sets value Given this class has at least one Composite to the element compositeText", "When Web user sets value Given variable \$key has value \$value to the element compositeStep1"])
        def compositeStep22() { }
    
        @Then("Web user is in the composites modal screen")
        @Composite(steps = ["Then Web element modalHeader should have text Browse Composites"])
        def compositeStep23() { }
    
        @Given("Web user is in the Browse Stories dialog")
        @Composite(steps = ["Given Web home page is opened", "When Web user clicks the element browseStories"])
        def compositeStep24() { }
    
}