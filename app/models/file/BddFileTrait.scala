package models.file

import java.io.File

import org.apache.commons.io.FileUtils

import scala.io.Source
import scalax.file.Path

@deprecated("Use BddFile instead")
trait BddFileTrait {

  val dir: String
  val path: String
  lazy val fullPath: String = s"$dir/$path"

  def content: String = {
    val file = new File(fullPath)
    if (fullPath.isEmpty || !file.exists || file.isDirectory) {
      ""
    }
    else {
      val fileSource = Source.fromFile(fullPath, "UTF-8")
      val stringSource = fileSource.mkString
      fileSource.close()
      stringSource
    }
  }

  def saveFile(filePath: String, content: String, overwrite: Boolean): Boolean = {
    val file = new File(filePath)
    if (file.exists && !overwrite) {
      false
    } else {
      val parentDir = file.getParentFile
      if (parentDir != null) {
        parentDir.mkdirs()
      }
      FileUtils.writeStringToFile(file, content, "UTF-8")
      true
    }
  }

  def delete(path: String): Boolean = {
    val file = new File(path)
    if (file.exists) {
      if (file.isFile) {
        file.delete
      } else {
        val (deleted, remaining) = Path.fromString(file.getAbsolutePath).deleteRecursively()
        remaining == 0
      }
    } else {
      true
    }
  }

  def list(): List[String] = {
    list(fullPath)
  }

  private[file] def list(path: String): List[String] = {
    val file = new File(path)
    if (file.exists()) {
      val files = file.listFiles()
      val filesInCurrentDir = files.filter(_.isFile).map(_.getAbsolutePath).toList
      val filesInSubDirs = files.filter(_.isDirectory).flatMap(file => list(file.getAbsolutePath))
      filesInCurrentDir ++ filesInSubDirs
    } else {
      List()
    }
  }

}
