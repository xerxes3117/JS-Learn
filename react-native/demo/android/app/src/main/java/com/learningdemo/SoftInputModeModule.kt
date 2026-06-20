package com.learningdemo

import android.view.WindowManager
import androidx.core.view.WindowCompat
import com.facebook.react.bridge.ReactApplicationContext
import com.facebook.react.bridge.ReactContextBaseJavaModule
import com.facebook.react.bridge.ReactMethod

class SoftInputModeModule(reactContext: ReactApplicationContext) :
    ReactContextBaseJavaModule(reactContext) {

  override fun getName(): String = "SoftInputMode"

  @ReactMethod
  fun setAdjustMode(mode: String) {
    val activity = currentActivity ?: return
    activity.runOnUiThread {
      val window = activity.window
      WindowCompat.setDecorFitsSystemWindows(window, true)

      val current = window.attributes.softInputMode
      val clearedAdjust =
          current and WindowManager.LayoutParams.SOFT_INPUT_MASK_ADJUST.inv()
      val adjustBits =
          when (mode) {
            "default" -> WindowManager.LayoutParams.SOFT_INPUT_ADJUST_UNSPECIFIED
            "resize" -> WindowManager.LayoutParams.SOFT_INPUT_ADJUST_RESIZE
            "pan" -> WindowManager.LayoutParams.SOFT_INPUT_ADJUST_PAN
            "nothing" -> WindowManager.LayoutParams.SOFT_INPUT_ADJUST_NOTHING
            else -> WindowManager.LayoutParams.SOFT_INPUT_ADJUST_UNSPECIFIED
          }
      window.setSoftInputMode(clearedAdjust or adjustBits)
    }
  }
}
